import BackLink from "../../../Components/BackLink";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "../Profile/Partials/UpdateProfileInformationForm";
import { PageProps } from "@/types/index";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useLaravelReactI18n();

    return (
        <div className="md:px-6">
            <div className="flex justify-between">
                <h1 className="text-4xl font-serif font-bold">
                    {t("Account Settings")}
                </h1>
                <BackLink
                    href={route("user.index")}
                    label={t("Back to Dashboard")}
                    className="mb-0"
                />
            </div>
            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="bg-light p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="bg-light p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-light p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
