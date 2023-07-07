export interface UserToken {
  id: string;
  name: string;
  username: string;
  access_token: string;
  image: string;
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
  retweetedBy?: string;
}

export interface UserProps {
  bannerImage: string;
  description: string;
  followers: FollowProps[];
  following: FollowProps[];
  username: string;
  profileimage: string;
  tweets: TweetProps[];
  id: string;
}

export interface FollowProps {
  username: string;
  profileimage: string;
  id: string;
}
