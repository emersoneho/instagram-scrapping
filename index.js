import { instagram } from "./modules/instagram.js";

const postLink = "https://www.instagram.com/p/B84AWx8DqBs";
const profileLink = "https://www.instagram.com/emersoneho";

const getPost = async (link, id) => {
  let postData = await instagram.getPost(link);
  let postHTML = document.getElementById(id);

  let pictures = "";

  await postData.pictures.forEach((post) => {
    pictures += `
                <img src="${post}" height="100px"
                alt="">
        `;
  });

  let html = `
        <div> ${pictures}</div>
        <p>Descrição: ${postData.description}</p>
    `;

  postHTML.innerHTML = html;
};

const getProfile = async (link, id) => {
  let profileData = await instagram.getProfile(link);
  let profileHTML = document.getElementById(id);

  let pictures = "";

  await profileData.latestPosts.forEach((post) => {
    pictures += `
            <a href="${post.link}" target="_blank">
                <img src="${post.picture}" height="100px"
                alt="">
            </a>
        `;
  });

  let html = `
        <img src="${profileData.pictureHD}" style="width:100px">
        <p>Nome: ${profileData.name}</p>
        <p>Biografia: ${profileData.biography}</p>
        <p>Seguindo: ${profileData.follow}</p>
        <p>Seguidores: ${profileData.followers}</p>
        <div> ${pictures}</div>
    `;

  profileHTML.innerHTML = html;
};

const initialization = async () => {
  await getProfile(profileLink, "instagram-profile");
  await getPost(postLink, "instagram-post");
};

initialization();
