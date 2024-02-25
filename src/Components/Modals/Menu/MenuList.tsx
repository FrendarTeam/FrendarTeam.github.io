import { useAppDispatch, useAppSelector } from 'Hooks/Redux'
import { UserAPI } from 'Scripts/User'
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import Toggle from 'react-toggle'
import 'react-toggle/style.css' // for ES6 modules
import MainColor from './MainColor'
import { set } from 'Features/userSlice'
import { getDarkMode } from 'Hooks/Dark'

export default function MenuList() {
    const [isSetUserModal, setisSetUserModal] = useState<boolean>(false)

    const user = useAppSelector((state) => state.user)

    useEffect(() => {}, [])

    const [userData, setUserData] = useState<{
        name: string
        birthday: string
    }>({
        name: '',
        birthday: '',
    })

    const isNotification = useAppSelector(
        (state) => state.user.value.isNotification,
    )
    const [isAlarmToggle, setIsAlarmToggle] = useState<boolean>(
        isNotification ? isNotification : false,
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        const updateUserData = () => {
            if (user.value.nickname) {
                setUserData({
                    name: user.value.nickname,
                    birthday: '1998-01-21',
                })
            }
        }
        updateUserData()
    }, [user])

    const handleAlarmToggle = useCallback(async () => {
        setIsAlarmToggle(!isAlarmToggle)
        dispatch(
            set({
                ...user.value,
                isNotification: !isAlarmToggle,
            }),
        )
        await UserAPI.updateAlarmToggle()
    }, [isAlarmToggle])

    const handleColor = useCallback(async (color: string) => {
        await UserAPI.updateMainColor(color)
    }, [])

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () => {
        fileInputRef?.current?.click()
    }

    const handleFileChange = (event: any) => {
        if (!event) {
            return
        }

        // 파일이 선택되었을 때 처리할 로직

        const file = event.target.files[0]
        console.log(URL.createObjectURL(file))

        const formData = new FormData()
        formData.append('file', file)
    }

    const handleSetUserStatus = useCallback(() => {
        setisSetUserModal(!isSetUserModal)
    }, [user])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nickname', e.target.nickname.value) // 'nickname' 필드 값 추가
        formData.append('birthday', e.target.birthday.value) // 'birthday' 필드 값 추가
        if (fileInputRef.current && fileInputRef.current.files) {
            if (fileInputRef.current.files[0]) {
                // 파일이 선택되었는지 확인
                formData.append('image', fileInputRef.current.files[0]) // 'image' 파일 추가
            }
        }

        // API 호출 시 FormData 객체 사용
        await UserAPI.updateUser(formData)

        const updatedUser = await UserAPI.getUser()
        dispatch(
            set({
                ...user.value,
                profileUrl: updatedUser.profileUrl,
            }),
        )
    }

    if (isSetUserModal) {
        return (
            <div className="flex  h-full flex-col  w-full justify-around pt-8  pb-8  ">
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full items-center"
                >
                    <div className="flex flex-col items-center justify-around  h-2/3  w-full ">
                        <div
                            className="
                        flex  
                        flex-col
                        items-center
                        "
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                name="image"
                            />
                            <img
                                className="flex h-32 w-32 object-cover rounded-full"
                                src={user.value.profileUrl}
                                alt="d"
                                onClick={handleImageClick}
                            ></img>
                        </div>

                        <div className="flex items-center border-2  p-2 rounded-2xl	   border-solid">
                            <input
                                className={`  text-center ${
                                    getDarkMode() ? '#202020' : ''
                                }`}
                                type="text"
                                value={userData.name}
                                onChange={(e) => {
                                    setUserData((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        }
                                    })
                                }}
                                name="nickname"
                                style={{
                                    backgroundColor: getDarkMode()
                                        ? '#202020'
                                        : '',
                                }}
                            />
                        </div>
                        <div className="flex items-center border-2  p-2 rounded-2xl	   border-solid">
                            <input
                                className={`  text-center `}
                                type="text"
                                value={userData.birthday}
                                onChange={(e) => {
                                    setUserData((prev) => {
                                        return {
                                            ...prev,
                                            birthday: e.target.value,
                                        }
                                    })
                                }}
                                name="birthday"
                                style={{
                                    backgroundColor: getDarkMode()
                                        ? '#202020'
                                        : '',
                                }}
                            />
                        </div>
                        <div className="flex w-full justify-center">
                            <button>
                                <input
                                    className="text-center "
                                    type="submit"
                                    value="변경"
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="flex  h-full flex-col justify-around  w-full pt-8  pb-8">
            <div className="flex flex-col items-center justify-around h-2/5   w-full ">
                <div
                    className="
                        flex  
                        flex-col
                        justify-around
                        items-center
                        "
                >
                    {/* <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    /> */}
                    <img
                        className="flex h-32 w-32 object-cover rounded-full"
                        src={user.value.profileUrl}
                        alt="d"
                        onClick={handleImageClick}
                    ></img>
                </div>

                <div className="flex  ">{user.value.nickname}</div>
            </div>
            <div className="flex flex-col h-2/5 items-center justify-around    w-full">
                <div className="flex " onClick={handleSetUserStatus}>
                    회원정보 변경
                </div>
                <div className="flex flex-col">
                    알림 설정
                    <Toggle
                        id="cheese-status"
                        defaultChecked={isAlarmToggle}
                        onChange={handleAlarmToggle}
                    />
                    <label htmlFor="cheese-status"></label>
                </div>
                <div className="flex flex-col items-center">
                    color
                    <div className="flex flex-row gap-3">
                        {['black', 'white'].map((color) => {
                            return (
                                <MainColor
                                    key={color}
                                    color={color}
                                    handleColor={handleColor}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="flex"> 로그아웃</div>
            </div>
        </div>
    )
}
