const { createApp } = Vue


const app = createApp( {
    data(){
        return {
            titulo : 'Harry Potter',
            personajes : [],
            personajesFiltrados: [],
            casas : [],
            checked : [],
            inputBusqueda : ''
        }
    },
    created(){
        fetch('https://hp-api.herokuapp.com/api/characters/students')
            .then( res => res.json())
            .then( data => {
                this.personajes = data
                this.personajesFiltrados = data
                this.obtenerCasas()
            })
            .catch( err => console.log(err))
    },
    methods: {
        obtenerCasas(){
            let fn = personaje => personaje.house
            this.casas = [... new Set( this.personajes.filter( fn ).map( fn ) ) ]
        },
        buscar(){
          this.personajesFiltrados = this.personajes.filter( personaje => personaje.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        }
    },
    computed:{
        filtrar(){
            const filtroPorChecked = this.personajes.filter( personaje => this.checked.includes( personaje.house ) || this.checked.length === 0)
            this.personajesFiltrados = filtroPorChecked.filter( personaje => personaje.name.toLowerCase().trim().includes( this.inputBusqueda.toLowerCase().trim() ) )
        }
    }

} )

app.mount('#app')

