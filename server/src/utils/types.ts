export interface UserProps {
  username: string;
  tweets: TweetProps[];
  profileimage: string;
}

interface TweetProps {
  tweet: {
    _id: string;
    tweet: string;
    retweets: number;
    likes: number;
    saves: number;
    comments: {
      comment: string;
      madeBy: {
        username: string;
        profileimage: string;
      };
      createdAt: string;
    }[];
    madeBy: {
      username: string;
      profileimage: string;
    };
    preference: string;
    createdAt: string;
    image?: string;
  };
  liked: boolean;
  saved: boolean;
  retweeted: boolean;
  timeMade: string;
}

export interface ReturnTweetProps extends TweetProps {
  retweetedBy: string;
}
