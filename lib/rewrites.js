module.exports = [
	{from: '/static/*', to:'/static/*'},
	{from: '/bootstrap/*', to:'/bootstrap/*'},
	{from: '/edit/', to:'_show/edit'},
	{from: '/update_recipe', to: '_update/update_recipe'},
	{from: '/login', to: '_update/login'}
	]
