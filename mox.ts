import {Mappings, StubMapping} from "./mapping";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RxHR} from "@akanass/rx-http-request";


export class Mox {

    constructor(private wiremockUrl: string = 'http://localhost:8443') {

    }

    addMapping(mapping: StubMapping): Observable<StubMapping> {
        console.log(`add mapping to wiremock on url ${this.wiremockUrl}`);

        const options = {
            body: mapping,
            json: true
        };

        return RxHR.post(`${this.wiremockUrl}/__admin/mappings`, options).pipe(map(data => {
            if (data.response.statusCode === 201) {
                return JSON.parse(data.body);
            } else {
                throw Error(`Error while addings mappings to wiremock. Response: ${data.response.statusCode} ${data.response.body}`);
            }
        }));
    }

    getMappings(): Observable<Mappings> {
        console.log(`getmapping from wiremock on url ${this.wiremockUrl}`);

        return RxHR.get(`${this.wiremockUrl}/__admin/mappings`).pipe(map(data => {
            if (data.response.statusCode === 200) {
                return JSON.parse(data.body);
            } else {
                console.log(data.response.statusCode);
                throw Error(`Error while retrieving mappings from wiremock. Response: ${data.response.statusCode} ${data.response.body}`);
            }
        }));
    }


}


const mox = new Mox();

mox.addMapping({
    response: undefined,
    request: {
        url: ' testurl'
    }
}).subscribe(stubmapping => {
    console.log(stubmapping);
    mox.getMappings().subscribe(mappings => console.log(mappings));
});

