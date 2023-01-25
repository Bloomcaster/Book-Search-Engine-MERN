const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        listing: async (parent, args, context) => {
            if (context.user) {
                const results = User.findOne({ _id: context.user._id });
                return results;
            }
            throw new AuthenticationError('Please log in to continue!!');
        },

    },

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });

        const token = signToken(user);

        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('Invalid, no user associated with this email');
        }

        const properPw = await user.isCorrectPassword(password);

        if (!properPw) {
            throw new AuthenticationError('Please check password, access denied');
        }

        const token = signToken(user);

        return { token, user };
    },
    saveBook: async (
        parent,
        { bookId, authors, description, title, image, link },
        context
    ) => {
        if (context.user) {
            return User.findOneandUpdate(
                { _id: context.user._id },
                {
                    $addToSet: {
                        savedBooks: { bookId, authors, description, title, image, link},
                    },
                },
                { new: true, runValidators: true }
            );
        } else {
            throw new AuthenticationError('Are you logged in?? Please check.');
        }
    },
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: {bookId } } },
                { new: TransitionEvent, runValidators: true }
            );
        } else {
            throw new AuthenticationError('Are you logged in, this is necessary!');
        }
    },
},
};

module.exports = resolvers;