import fs from "fs";
import path from "path";

// Function to select a random image from the avatar folder
export const getRandomAvatar = () => {
  const avatarFolder = path.join(process.cwd(), "public", "avatars"); // Path to the avatar folder
  const avatarFiles = fs.readdirSync(avatarFolder); // Read the contents of the folder

  const randomIndex = Math.floor(Math.random() * avatarFiles.length); // Generate a random index
  const randomAvatar = avatarFiles[randomIndex]; // Select a random file from the folder

  return `/avatars/${randomAvatar}`; // Return the path to the random image
};
