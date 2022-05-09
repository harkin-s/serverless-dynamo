export async function get() {
    const baseURL =
        "https://jpofvz1x5m.execute-api.eu-west-1.amazonaws.com/live/";

    const respose = await fetch(`${baseURL}list`, {
        method: "GET",
    });
    console.log(respose);
    return { body: respose.body };
}