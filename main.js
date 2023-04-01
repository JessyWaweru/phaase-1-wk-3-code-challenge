

async function main() {


    const data = await axios.get('http://localhost:3000/films');
    console.log(data);
}
