export const isAdmin = (admin) => {
    return admin.role === "admin";
};

export const isHod = (admin) => {
    return admin.role === "hod";
};

export const isTeacher = (user) => {
    return user.role === "teacher";
};

export const isStudent = (user) => {
    return user.role === "student";
};
