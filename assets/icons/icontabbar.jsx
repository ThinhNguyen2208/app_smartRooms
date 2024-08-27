import { AntDesign, Feather } from "@expo/vector-icons";
import Home from './Home'
import Search from './Search'
import AddCircleIcon from './AddCircleIcon'
import Notification from './Notification'
import User from './User'
export const icons = {
    home: (props) => <Home {...props} />,
    notification: (props) => <Notification {...props} />,
    post: (props) => <AddCircleIcon {...props} />,
    profile: (props) => <User {...props} />,
    search: (props) => <Search {...props} />,
}