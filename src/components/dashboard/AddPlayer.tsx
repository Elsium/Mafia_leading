import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {addPlayer} from "@/redux/Features/gameSlice";
import AddIcon from '@mui/icons-material/Add';

export default function AddPlayer() {
    const dispatch = useDispatch<AppDispatch>()
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: (values, {resetForm}) => {
            if(values.name) {
                dispatch(addPlayer({name: values.name}))
                resetForm()
            }
        }
    })
    return (
        <div className='w-1/2'>
            <form onSubmit={formik.handleSubmit} className='flex items-center gap-5'>
                <label className='flex gap-5 items-center'>
                    <p className='font-poppins'>Имя игрока</p>
                    <input className='font-quicksand p-3 border border-blue-500 rounded outline-none' onChange={formik.handleChange} name='name' value={formik.values.name} type="text"/>
                </label>
                <button className='hover:text-yellow-600' type='submit'><AddIcon/></button>
            </form>
        </div>
    )
}