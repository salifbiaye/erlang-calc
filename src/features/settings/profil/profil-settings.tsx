"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { User, Lock, Palette, Bell, Shield,  } from "lucide-react"

const settingsSections = [
    {
        id: "profile",
        title: "Profile",
        icon: User,
        description: "Manage your personal information",
    },
    {
        id: "security",
        title: "Security",
        icon: Lock,
        description: "Password and authentication settings",
    },
    {
        id: "notifications",
        title: "Notifications",
        icon: Bell,
        description: "Configure your notification preferences",
    },
    {
        id: "appearance",
        title: "Appearance",
        icon: Palette,
        description: "Customize the look and feel",
    },

    {
        id: "privacy",
        title: "Privacy",
        icon: Shield,
        description: "Control your privacy settings",
    },


]

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("profile")
    const [darkMode, setDarkMode] = useState(true)
    const [notifications, setNotifications] = useState(true)

    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Profile Information</h2>
                            <p className="text-slate-400">Update your personal details and profile settings.</p>
                        </div>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarFallback className="text-2xl bg-slate-600 text-white">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                                        >
                                            Change Avatar
                                        </Button>
                                        <p className="text-xs text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name" className="text-slate-300">
                                            First Name
                                        </Label>
                                        <Input
                                            id="first-name"
                                            defaultValue="John"
                                            className="bg-slate-700/50 border-slate-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name" className="text-slate-300">
                                            Last Name
                                        </Label>
                                        <Input id="last-name" defaultValue="Doe" className="bg-slate-700/50 border-slate-600 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-300">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue="john.doe@company.com"
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-slate-300">
                                        Company
                                    </Label>
                                    <Input
                                        id="company"
                                        defaultValue="Telecom Solutions Inc."
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-slate-300">
                                        Bio
                                    </Label>
                                    <textarea
                                        id="bio"
                                        rows={3}
                                        placeholder="Tell us about yourself..."
                                        className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "security":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
                            <p className="text-slate-400">Manage your password and security preferences.</p>
                        </div>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-white">Change Password</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password" className="text-slate-300">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password" className="text-slate-300">
                                        New Password
                                    </Label>
                                    <Input id="new-password" type="password" className="bg-slate-700/50 border-slate-600 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className="text-slate-300">
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                    />
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Enable 2FA</p>
                                        <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                                    </div>
                                    <Switch />
                                </div>
                                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                                    Configure 2FA
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "notifications":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Notification Settings</h2>
                            <p className="text-slate-400">Choose what notifications you want to receive.</p>
                        </div>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-white">Email Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Simulation Complete</p>
                                        <p className="text-sm text-slate-400">When a simulation finishes processing</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Simulation Shared</p>
                                        <p className="text-sm text-slate-400">When someone shares a simulation with you</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Weekly Summary</p>
                                        <p className="text-sm text-slate-400">Weekly report of your simulation activity</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-white">Push Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Browser Notifications</p>
                                        <p className="text-sm text-slate-400">Receive notifications in your browser</p>
                                    </div>
                                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Mobile Push</p>
                                        <p className="text-sm text-slate-400">Receive notifications on your mobile device</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            case "appearance":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Appearance</h2>
                            <p className="text-slate-400">Customize how the application looks and feels.</p>
                        </div>

                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-white">Theme</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Dark Mode</p>
                                        <p className="text-sm text-slate-400">Use dark theme across the application</p>
                                    </div>
                                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Compact Mode</p>
                                        <p className="text-sm text-slate-400">Reduce spacing for more content</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {settingsSections.find((s) => s.id === activeSection)?.title}
                            </h2>
                            <p className="text-slate-400">{settingsSections.find((s) => s.id === activeSection)?.description}</p>
                        </div>
                        <Card className="bg-slate-800/30 border-slate-700/50">
                            <CardContent className="p-6">
                                <p className="text-slate-400">This section is coming soon...</p>
                            </CardContent>
                        </Card>
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="flex">
                <div className="flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700/50 px-6">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-white">Settings</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>

                    <div className="flex">
                        {/* Settings Sidebar */}
                        <div className="w-64 border-r border-slate-700/50 bg-slate-800/20 p-4">
                            <div className="space-y-1">
                                {settingsSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                            activeSection === section.id
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                                        }`}
                                    >
                                        <section.icon className="h-4 w-4" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{section.title}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="flex-1 p-6">{renderContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
