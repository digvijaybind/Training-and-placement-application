// component's config object.


//pages //media //comment //contact //blog //profile //category //tag //users //settings



const components = {
	addcompany:{
		component:'Addcompany',
		url:'/add-company',
		title:'Add New Drive',
		icon:'business',
		module:1
	},
	allusers: {
		component: 'AllUsers',
		url: '/users',
		title: 'Users',
		icon: 'people',
		module: 1
	},
	contactusadmin:{
		component: 'ContactUsAdmin',
		url: '/contactus-data',
		title: 'ContactUs',
		icon: 'inbox',
		module: 1
	},
	allcompanies:{
		component:'Allcompanies',
		url:'/companies',
		title:'All Drives',
		icon:'business',
		module:1
	},
	companydetails:{
		component:"Companydetail",
		url:"/company-detail/:ID",
		title:'CompanyDetails',
		icon:'book',
		module:1,
		child:true
	},
	driveprofile:{
		component:"DriveProfile",
		url:"/drive-profile/",
		title:'Drive Profile',
		icon:'bookmark',
		module:1
	},
	addnewuser:{
		component:"AddNewUser",
		url:"/new-user/",
		title:'Add New User',
		icon:'book',
		module:1
	}
 
};

// modules for grouping.
const modules = {
	0: {
		title: 'Dashboard',
		icon: 'add_circle',
		isExpendable: true
	}
};

// component's access to roles.
const rolesConfig = {
	Admin: {
		routes: [...Object.values(components)]
	},
	Manager: {
		routes: [
			components.allcompanies,
			components.companydetails,
			components.addcompany,
			components.driveprofile
		]
	},
	User:{
		routes:[components.driveprofile]
	},
	common: {
		routes: [
			{
				component: 'HomePage',
				url: '/',
				title: 'Home',
				icon: 'home',
				module: 1
			},
			{
				component: 'UserProfile',
				url: '/user-profile',
				title: 'User Profile',
				icon: 'face',
				module: 1
			}
		]
	}
};

export { modules, rolesConfig };
