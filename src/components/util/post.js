
export const getWorkURL = (work) => {
    return work.acf?.blog_post_ref_id ? "/blog/" + work.acf?.blog_post_ref_id : work.acf?.work_url;
}