export interface UserToken {
  id: string;
  name: string;
  username: string;
  access_token: string;
}

export interface TweetProps {
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

export interface HomeTweetProps extends TweetProps {
  retweetedBy: string;
}

export interface UserProps {
  bannerImage: string;
  description: string;
  followers: [];
  following: [];
  username: string;
  profileimage: string;
  tweets: TweetProps[];
}
