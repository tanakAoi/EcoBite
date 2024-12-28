import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import DangerButton from "../../../../Components/DangerButton";
import Modal from "../../../..//Components/Modal";
import InputLabel from "../../../../Components/InputLabel";
import TextInput from "../../../../Components/TextInput";
import InputError from "../../../../Components/InputError";
import SecondaryButton from "../../../../Components/SecondaryButton";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const { t } = useLaravelReactI18n();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("user.delete"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t("Delete Account")}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t(
                        "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."
                    )}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {t("Delete Account")}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t("Are you sure you want to delete your account?")}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t("Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.")}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder={t("Password")}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t("Cancel")}
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {t("Delete Account")}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
