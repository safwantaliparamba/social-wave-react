import { Navigate, Route, Routes } from "react-router-dom";
import BaseSettings from "../../screens/main/settings/BaseSettings";
import ProfileSettings from "../../screens/main/settings/ProfileSettings";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";


const SettingsRoutes = () => {
    const [prev, setPrev] = useState('/')

    const NavigateToProfile = () => {
        const { locations } = useSelector(state => state.ui)

        useEffect(() => {
            const tempLocations = [...locations]

            const tempPrev = tempLocations.pop()

            setPrev(tempPrev)
        }, [])

        return <Navigate to="/settings/profile" state={{ prev }} />
    }

    return (
        <Routes>
            <Route path="*" element={<BaseSettings prevLocation={prev} />}>
                <Route index element={<NavigateToProfile />} />
                <Route path='profile/' element={<ProfileSettings />} />
            </Route>
        </Routes>
    );
}

export default SettingsRoutes