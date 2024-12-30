import { useState } from "react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";

const useFileUpload = (category: string) => {
    const [error, setError] = useState<string | null>(null);
    const { t } = useLaravelReactI18n();

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const uploadImage = async (file: File | null) => {
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError(t("The file size exceeds the maximum limit of 10MB."));
            return;
        }

        const formData = new FormData();
        formData.append("category", category);
        formData.append("image", file);

        try {
            const response = await axios.post(route("upload.store"), formData);
            const uploadedImageUrl = response.data.url;
            return uploadedImageUrl;
        } catch (error) {
            setError("Image upload failed.");
            return null;
        }
    };

    return { uploadImage, error };
};

export default useFileUpload;
