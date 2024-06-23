import { Poppins, Quicksand} from "next/font/google"
export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['500', '700'],
    variable: '--font-poppins'
})
export const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['500', '700'],
    variable: '--font-quicksand'
})