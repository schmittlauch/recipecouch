module.exports = [
	{from: '/static/*', to:'/static/*'},
	{from: '/bootstrap/*', to:'/bootstrap/*'},
	{from: '/edit/', to:'_show/edit'},
	{from: '/update_recipe', to: '_update/update_recipe'},
	{from: '/login', to: '_update/login'},
	{from: '/create_user', to: '_show/create_user'},
	{from: '/update_user', to: '_update/update_user'},
	{from: '/', to: '_show/edit'},
	]
