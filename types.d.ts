type User = {
    id: string
    firstname: string,
    lastname: string,
    email: string,
    status: string,
    directorOf: {
        id: string,
        name: string
    },
    staff: {
        id: string,
        name: string
    }
}

type Leave = {
    id: string;
    title: string;
    description: string;
    status: string;
    firstname: string;
    lastname: string;
    start_date: string;
    end_date: string;
    number_of_weeks: string;
    number_of_days: string;
    leave_type: string;
    comment: string;
    departmental_approval: string,
    operation_management_approval: string
    user: User
}

type Department = {
    id: string,
    name: string,
    director: {
        id: string
        firstname: string;
        lastname: string;
        email: string;
        status: string;
    },
    staff: User[]
}


type Relive_Request = {
    id: string,
    acceptance_date: string,
    accept_relieve: boolean
    is_viewed: boolean,
    relieve_leave: Leave,
    relieving_officer: User,
    requesting_officer: User
}