import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    background: '#15242b',
    color: '#fff',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const sweetAlerts = {
    success: (text) => {
        Toast.fire({
            icon: 'success',
            title: text
        })
    },
    error: (text) => {
        Toast.fire({
            icon: 'error',
            title: text
        })
    },
}

export default sweetAlerts;