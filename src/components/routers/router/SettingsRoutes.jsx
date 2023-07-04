import { Navigate, Route, Routes } from "react-router-dom";
import BaseSettings from "../../screens/main/settings/BaseSettings";
import Profile from "../../screens/main/settings/Profile";


const SettingsRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<BaseSettings />}>
                <Route index element={<Navigate to="/settings/profile" />} />
                <Route path='profile/' element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default SettingsRoutes