export const generateCode = (passwordLength) => {
    let charset = "";
    let newPassword = "";

    //todo to set up more presize after consultation

    charset += "0123456789";
    charset += "abcdefghijklmnopqrstuvwxyz";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
        newPassword += charset.charAt(
            Math.floor(Math.random() * charset.length)
        );
    }

    return newPassword;
};
