import Button from "../../Components/Button";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

const AccountSetting = () => {
    const { user } = usePage().props;
    const [tab, setTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: user?.username,
        email: user?.email,
    });
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    };

    const saveProfile = async () => {
        try {
            const response = await axios.put(
                route("user.account.update.profile"),
                profile
            );
            setMessage(
                response.data.success || "Profile updated successfully."
            );
            setIsEditing(false);
        } catch (error) {
            setMessage("Error updating profile.");
            console.error(error);
        }
    };

    const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.newPassword !== password.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.put(
                route("user.account.update.password"),
                {
                    newPassword: password.newPassword,
                }
            );
            setMessage(
                response.data.message || "Password updated successfully."
            );
            setPassword({ newPassword: "", confirmPassword: "" });
        } catch (error) {
            setMessage("Error updating password.");
            console.error(error);
        }
    };
    console.log(password);
    

    const renderContent = () => {
        switch (tab) {
            case "profile":
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                        {!isEditing ? (
                            <div>
                                <p>
                                    <strong>Name:</strong> {profile.username}
                                </p>
                                <p>
                                    <strong>Email:</strong> {profile.email}
                                </p>
                                <Button label="Edit Profile" onClick={() => setIsEditing(true)} />
                            </div>
                        ) : (
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Your Email"
                                    />
                                </div>
                                <Button label="Save Changes" onClick={saveProfile} />
                            </form>
                        )}
                    </div>
                );
            case "account":
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            Account Settings
                        </h2>
                        <form className="space-y-4" onSubmit={updatePassword}>
                            <div>
                                <label className="block text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={password.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="New Password"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <Button label="Update Password" type="submit" />
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b border-dark/10">
                <button
                    onClick={() => setTab("profile")}
                    className={`flex-1 px-6 py-4 text-center font-semibold ${
                        tab === "profile"
                            ? "bg-dark text-primary"
                            : "bg-light text-dark hover:bg-light/50"
                    }`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setTab("account")}
                    className={`flex-1 px-6 py-4 text-center font-semibold ${
                        tab === "account"
                            ? "bg-dark text-primary"
                            : "bg-light text-dark hover:bg-light/50"
                    }`}
                >
                    Account Settings
                </button>
            </div>
            <div>{renderContent()}</div>
            {message && (
                <div className="p-4 text-center text-white bg-green-500 mt-4 rounded-lg">
                    {message}
                </div>
            )}
        </div>
    );
};

export default AccountSetting;
