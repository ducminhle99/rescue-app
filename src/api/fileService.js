import { getLocalAccessToken } from "../redux/localStorage";

const getFileInfo = (uri) => {
    const lastIndexOfDot = uri.lastIndexOf(".");
    const fileType = uri.substring(lastIndexOfDot);
    const lastIndexOfSlash = uri.lastIndexOf("/");
    const fileName = uri.substring(lastIndexOfSlash);

    return {
        fileName,
        fileType
    }
}

const getDataToUpload = (uri) => {
    const { fileName, fileType } = getFileInfo(uri);
    let formData = new FormData();
    formData.append("image", {
        uri,
        name: fileName,
        type: `image/${fileType}`,
    });

    return formData;
}

export const uploadFile = async (formData) => {
    const data = getDataToUpload(formData);
    const token = await getLocalAccessToken();
    try {
        let response = await fetch('http://192.168.1.4:5000/api/test/img', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': token.authToken,
            },
            method: 'POST',
            body: data
        })

        let file = await response.json();
        return file;
    } catch (error) {
        console.error(error);
    }
};