const getPost = async (postLink) =>{
    let response = await fetch(postLink);
    response = await response.text();

    let data = response.split("window._sharedData = ")[1].split("<\/script>")[0];
    data = JSON.parse(data.substr(0, data.length - 1));

    let post = formatPost(data);
    return await post;
};

const formatPost = async (data) => {
    let aux = data.entry_data.PostPage[0].graphql;
    let post = {
        description: "",
        pictures: []
    }

    post.description = aux.shortcode_media.edge_media_to_caption.edges[0].node.text;
    post.pictures = aux.shortcode_media.edge_sidecar_to_children.edges.map(a => a.node.display_url);
    return post;
}

getPost("https://www.instagram.com/p/CB2wqlmqdr2/").then(response => {
    let data = response;
    console.log(data);
});