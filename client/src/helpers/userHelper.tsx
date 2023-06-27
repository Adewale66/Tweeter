import { faker } from "@faker-js/faker";

interface TweetProps {
  id: string;
  tweet: string;
  image?: string;
  madeBy: {
    username: string;
    avatar: string;
  };
  retweets: number;
  comments: number;
  madeAt: string;
  saves: string;
}
