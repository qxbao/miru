import PGServices from "../postgre/services";

class ioServices {
    static removeUser(arr: any[], id: string) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].socketid == id)
                arr.splice(i, 1);
        }
    }
    static async getDashboardInfo(userObject : any): Promise<Object> {
        const res = await PGServices.getUserProperty(userObject.username, ["miruca", "items", "investments"])
        return res;
    }
}

export default ioServices;