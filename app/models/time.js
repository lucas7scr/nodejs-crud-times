const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//criar o Schema
const timeSchema = new Schema({
  nome: String,
  slug: {
    type: String,
    unique: true
  },
  descricao: String
});

//middleware
timeSchema.pre('save', function(next) {
  this.slug = slugify(this.nome);
  next();
});

//criar o model
const timeModel = mongoose.model('Time', timeSchema);

//exportar o modulo
module.exports = timeModel;

//função p/ 'slugify' o nome
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           //Substitui espaços com -
    .replace(/[^\w\-]+/g, '')       //Remove caracteres especiais
    .replace(/\-\-+/g, '-')         //Substitui multiplos '-' com somente 1 '-'
    .replace(/^-+/, '')             //Retira - do inicio de um texto
    .replace(/-+$/, '');            //Retira - do final de um texto
}