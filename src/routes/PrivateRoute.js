
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
export default function PrivateRoute(props) {
    const user = useSelector(state => state.user.account);
    if (user && !user.auth) {
        return <>
            <Alert variant="danger">
                <Alert.Heading>Chúc bạn có một ngày làm việc thật vui vẻ!</Alert.Heading>
                <p>
                    Lỗi quyền truy cập!
                </p>
                <hr />
                <p className="mb-0">
                    Xin lỗi bạn không có quyền vào trang này. Xin hãy liên hệ với chủ tịch :))

                </p>
            </Alert>
        </>
    }
    return (
        <>

            {props.children}
        </>
    )
}
