import { Navigate, Route, Routes } from "react-router-dom";
import BaseSettings from "../../screens/main/settings/BaseSettings";
import ProfileSettings from "../../screens/main/settings/ProfileSettings";


const SettingsRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<BaseSettings />}>
                <Route index element={<Navigate to="/settings/profile" />} />
                <Route path='profile/' element={<ProfileSettings />} />
            </Route>
        </Routes>
    );
}

export default SettingsRoutes