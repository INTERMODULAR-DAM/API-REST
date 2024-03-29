const User = require('../models/user')
const service = require('../../globalServices/autentication');
const { identifyId } = require('../utils/userUtils');
const postService = require('../../posts/services/postService');
const commentService = require('../../comments/services/commentService')
const emailUtils = require('../../globalUtils/emailUtils');
const { deleteImage } = require('../../globalUtils/imageUtils');
const dotenv = require('dotenv');
dotenv.config();


const getUserById = async (_id) =>
{
    return await User.findById(_id);

}

const getAllUser = async () =>
{
    return await User.find()
}

const getFollowers = async (id) =>
{
    return await User.find({ following: [id] })
}

const signIn = async (userId, password) =>
{
    const searchedUser = await identifyId(userId, password);
    const MAX_LOGIN_ATTEMPS = 5
    const LOCK_TIME = 4 * 60 * 1000
    let now = Date.now();
    let isLocked = false;
    let hasLockExpired = false
    isLocked = searchedUser.lock_until > now;
    hasLockExpired = searchedUser.lock_until < now;
    if (isLocked)
    {
        return { status: 400, data: "The account is locked, please wait to sign in" }
    }

    if (hasLockExpired)
    {
        searchedUser.lock_until = undefined;
        searchedUser.login_attempts = 0;
        await searchedUser.save();
    }

    return await service.comparePassword(password, searchedUser.password)
        .then(async isMatch =>
        {
            if (isMatch)
            {
                if (searchedUser.login_attempts > 0)
                    await searchedUser.updateOne({ $set: { login_attempts: 0 }, $unset: { lock_until: 1 } })
                return { status: 200, data: service.createToken(searchedUser) }
            } else
            {
                let updates = { $inc: { login_attempts: 1 } }
                if (searchedUser.login_attempts + 1 >= MAX_LOGIN_ATTEMPS)
                    updates.$set = { lock_until: now + LOCK_TIME }
                await searchedUser.updateOne(updates)
                return { status: 400, data: "The user or password are incorrect, try again" }
            }
        })
        .catch(error =>
        {
            return { status: 500, data: "An internal error has ocurred, please contact with your administrator" }

        })
}

const signUp = async (user) =>
{
    user.password = await service.encrypt(user.password);
    let token = await new Promise(async (resolve, reject) =>
    {
        new User(user).save((err, newUser) =>
        {
            if (err)
            {
                reject({ status: 400, data: "Some fields were bad, please fix it." })
            }
            return resolve(service.createToken(newUser));
        });
    })
    return token;
}

const updateUser = async (id, changes) =>
{
    const oldUser = await User.findById(id);
    await User.findOneAndUpdate({ _id: id }, changes);
}

const deleteUser = async (id) =>
{
    let response;
    await User.findOneAndDelete({ _id: id }).then(result =>
    {
        response = false;
        if (result != null)
        {
            response = true;
            deleteImage(result.pfp_path);
            postService.deleteAllPostsByUser(id);
            commentService.deleteCommentsByUser(id);
        }
    })
    return response;
}


const sendForgotPasswordEmail = async (email) =>
{
    let response = false;
    const user = await User.find({ email: email }, 'password');
    if (user.length > 0)
    {
        await emailUtils.sendForgotPasswordEmail(email, user[0].password);
        response = true
    }
    return response;
}


const followAUser = async (user, userToFollow) =>
{
    const userDB = await User.findById(user);
    if (!userDB.following.includes(userToFollow))
    {
        userDB.following.push(userToFollow);
        await userDB.save();
        return { status: 200, data: "You have followed the user correctly" }
    } else
    {
        return { status: 400, data: "You already follow this user" }
    }
}


const unfollowAUser = async (user, userToUnfollow) =>
{
    const userDB = await User.findById(user);
    if (userDB.following.includes(userToUnfollow))
    {
        userDB.following = userDB.following.filter(deleteUser => deleteUser != userToUnfollow);
        await userDB.save();
        return { status: 200, data: "You have unfollowed the user correctly" }
    } else
    {
        return { status: 400, data: "You don't follow this user" }
    }
}

module.exports = {
    getAllUser,
    signIn,
    signUp,
    updateUser,
    deleteUser,
    getUserById,
    sendForgotPasswordEmail,
    followAUser,
    unfollowAUser,
    getFollowers,
}
