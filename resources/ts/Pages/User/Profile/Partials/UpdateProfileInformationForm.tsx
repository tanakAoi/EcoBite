import InputError from "../../../../Components/InputError";
import InputLabel from "../../../../Components/InputLabel";
import PrimaryButton from "../../../../Components/PrimaryButton";
import TextInput from "../../../../Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { user } = usePage().props;
    const { t } = useLaravelReactI18n();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user?.username,
            email: user?.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {t("Profile Information")}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t("Update your account's profile information and email address.")}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="username" value="username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {user?.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                           {t("Your email address is unverified.")}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {t("Click here to re-send the verification email.")}
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                {t("A new verification link has been sent to your email address.")}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t("Save")}</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t("Saved.")}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
