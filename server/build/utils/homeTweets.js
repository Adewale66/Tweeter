"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTweets = void 0;
function sortTweets(users, req) {
    const tweets = [];
    for (let i = 0; i < users.length; i++) {
        //for the made tweets
        for (let j = 0; j < users[i].tweets.length; j++) {
            const tempTweet = {
                tweet: {
                    tweet: users[i].tweets[j].tweet.tweet,
                    madeBy: {
                        username: users[i].tweets[j].tweet.madeBy.username,
                        profileimage: users[i].tweets[j].tweet.madeBy.profileimage,
                        name: users[i].tweets[j].tweet.madeBy.name,
                    },
                    image: users[i].tweets[j].tweet.image,
                    comments: [],
                    retweets: users[i].tweets[j].tweet.retweets,
                    saves: users[i].tweets[j].tweet.saves,
                    likes: users[i].tweets[j].tweet.likes,
                    _id: users[i].tweets[j].tweet._id,
                    preference: users[i].tweets[j].tweet.preference,
                    createdAt: users[i].tweets[j].tweet.createdAt,
                },
                timeMade: users[i].tweets[j].retweeted
                    ? users[i].tweets[j].timeMade
                    : users[i].tweets[j].tweet.createdAt,
                retweetedBy: users[i].tweets[j].retweeted ? users[i].username : "",
                retweeted: users[i].tweets[j].retweeted,
                saved: users[i].tweets[j].saved,
                liked: users[i].tweets[j].liked,
            };
            //for the comments
            for (let c = 0; c < users[i].tweets[j].tweet.comments.length; c++) {
                tempTweet.tweet.comments.push({
                    madeBy: {
                        username: users[i].tweets[j].tweet.comments[c].madeBy.username,
                        profileimage: users[i].tweets[j].tweet.comments[c].madeBy.profileimage,
                        name: users[i].tweets[j].tweet.comments[c].madeBy.name,
                    },
                    comment: users[i].tweets[j].tweet.comments[c].comment,
                    createdAt: users[i].tweets[j].tweet.comments[c].createdAt,
                });
            }
            tweets.push(tempTweet);
        }
    }
    //filter duplicates
    let temp = [];
    for (let i = 0; i < tweets.length; i++) {
        const check = temp.find((e) => e.tweet._id.toString() === tweets[i].tweet._id.toString());
        if (check) {
            if (check.retweetedBy === req.user.username)
                continue;
            else {
                if (tweets[i].retweetedBy === req.user.username) {
                    temp = temp.filter((e) => e.tweet._id.toString() !== tweets[i].tweet._id.toString());
                    temp.push(tweets[i]);
                }
                else {
                    if (!check.retweetedBy) {
                        temp = temp.filter((e) => e.tweet._id.toString() !== check.tweet._id.toString());
                        temp.push(tweets[i]);
                    }
                }
            }
        }
        else
            temp.push(tweets[i]);
    }
    temp.sort((a, b) => {
        const time1 = new Date(a.tweet.createdAt);
        const time2 = new Date(b.tweet.createdAt);
        return time2.getTime() - time1.getTime();
    });
    return temp;
}
exports.sortTweets = sortTweets;
//# sourceMappingURL=homeTweets.js.map