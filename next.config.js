/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.pixabay.com", "this-person-does-not-exist.com", "thispersondoesnotexist.com",
      "i.picsum.photos",
      "randomuser.me",
      "lh3.googleusercontent.com", "picsum.photos"],
  },
};
