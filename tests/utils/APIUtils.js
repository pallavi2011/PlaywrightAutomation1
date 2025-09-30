class APIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
        const loginResponse =  await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
        data: this.loginPayload
    });

   
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson.token);
    token = loginResponseJson.token;
    return token;

    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: orderPayload,
                headers: {
                    'Authorization': this.getToken(),
                    'Content-Type': 'application/json'  
                }
            });
        
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            return orderId;
    }
}

module.exports = {APIUtils};