import { useForm } from "@inertiajs/react";
import Button from "../../../../Components/Button";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FC, FormEventHandler, useEffect, useState } from "react";

const EditHeroForm: FC = () => {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm({
        tagline: "",
        image: null as File | null,
        image_url: "",
        text_color: "light",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (data.image) {
            const imageFormData = new FormData();

            imageFormData.append("category", "other");
            imageFormData.append("image", data.image);

            try {
                const response = await axios.post(
                    route("upload.store"),
                    imageFormData
                );
                setData("image_url", response.data.url);
            } catch (error) {
                console.error(error);
                setError((error as any).message);
                return;
            }
        } else {
            setData("image_url", "");
        }

        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            const formData = new FormData();

            formData.append("tagline", data.tagline);
            formData.append("text_color", data.text_color);
            if (data.image_url) {
                formData.append("image_url", data.image_url);
            }

            post(route("admin.settings.hero.update"), {
                data: formData,
            });

            setIsSubmitting(false);
        }
    }, [isSubmitting, data.image_url]);

    return (
        <div className="mb-10 max-w-2xl">
            <h3 className="font-bold text-xl mb-4">{t("Edit Hero")}</h3>
            <div className="mb-6 text-gray-700">
                <p>
                    {t(
                        "A hero is a key visual element on the homepage, designed to grab attention and highlight important content or actions. It usually includes a catchy tagline and an image that represents the theme of the website."
                    )}
                </p>
                <p className="mt-2">
                    {t(
                        "In this section, you can update the hero text, image, and text color to better match the theme of your site."
                    )}
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div>
                    <label
                        htmlFor="heroText"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        {t("Hero text")}
                    </label>
                    <input
                        type="text"
                        id="heroText"
                        value={data.tagline}
                        onChange={(e) => setData("tagline", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label
                        htmlFor="textColor"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        {t("Text color")}
                    </label>
                    <select
                        id="textColor"
                        value={data.text_color}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        onChange={(e) => setData("text_color", e.target.value)}
                    >
                        <option value="light">{t("Light")}</option>
                        <option value="dark">{t("Dark")}</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="heroImage"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        {t("Hero image")}
                    </label>
                    <input
                        type="file"
                        id="heroImage"
                        accept="image/*"
                        onChange={(e) =>
                            setData(
                                "image",
                                e.target.files ? e.target.files[0] : null
                            )
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm mt-1">{error}</div>
                )}
                <Button
                    label={t("Save")}
                    type="submit"
                    className="w-fit self-end"
                    disabled={processing}
                />
            </form>
        </div>
    );
};

export default EditHeroForm;
