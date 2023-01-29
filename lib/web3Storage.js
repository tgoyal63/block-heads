import { Web3Storage } from "web3.storage";

export const makeStorageClient = () =>
  new Web3Storage({
    token:
      process.env.WEB3STORAGE_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgzNzA0NjkzNjQwMWNiQTBlOGE5YjE4YmRmN2UyNzQxMzZiNzk1MjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ5NDg5OTMxMjAsIm5hbWUiOiJCbG9ja0hlYWRzIn0.uH99TOGm_zhlh7fFXZGDoNYFsQ_fmXFtFhRsrkWjQD8",
  });
