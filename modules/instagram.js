const instagram = {
  getPost: async (postLink) => {
    let response = await fetch(postLink);
    response = await response.text();

    let data = response.split("window._sharedData = ")[1].split("</script>")[0];
    data = JSON.parse(data.substr(0, data.length - 1));

    let post = formatPost(data);
    return await post;
  },
  getProfile: async (profileLink) => {
    let response = await fetch(profileLink);
    response = await response.text();

    let data = response.split("window._sharedData = ")[1].split("</script>")[0];
    data = JSON.parse(data.substr(0, data.length - 1));

    let profile = formatProfile(data);
    return profile;
  },
};

const formatProfile = async (data) => {
  let aux = data.entry_data.ProfilePage[0].graphql.user;

  let profile = {
    name: aux.full_name,
    biography: aux.biography,
    pictureHD: aux.profile_pic_url_hd,
    pictureSmall: aux.profile_pic_url,
    follow: aux.edge_follow.count,
    followers: aux.edge_followed_by.count,
    latestPosts: aux.edge_owner_to_timeline_media.edges.map((a) => ({
      picture: a.node.display_url,
      link: `https://www.instagram.com/p/${a.node.shortcode}`,
    })),
  };
  return profile;
};

const formatPost = async (data) => {
  let aux = data.entry_data.PostPage[0].graphql;

  let post = {
    description: aux.shortcode_media.edge_media_to_caption.edges[0].node.text,
  };

  post.pictures = aux.shortcode_media.edge_sidecar_to_children
    ? aux.shortcode_media.edge_sidecar_to_children.edges.map(
        (a) => a.node.display_url
      )
    : [aux.shortcode_media.display_url];

  return post;
};

export { instagram };
