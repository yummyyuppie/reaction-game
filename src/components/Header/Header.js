import './Header.css'
import {FiLogOut} from 'react-icons/fi'
import {useDispatch} from 'react-redux'
import { useAuth } from 'hooks/use-auth';
import {removeUser} from 'store/slices/userSlice'
export default function Header(){
    const dispatch = useDispatch();
    const {displayName} = useAuth();
    return (
        <div className='header'>
            <div className='profile'>
                <div className='profile_name'>Hello, {displayName}</div>
                <div className='logout' onClick={()=>dispatch(removeUser())}>
                    <FiLogOut/>
                    <span>Logout</span>
                    </div>
            </div>
        </div>
    )
}