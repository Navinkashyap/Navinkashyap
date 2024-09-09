const User = require("../models/user");


module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
if (err) {
return next(err);
}
req.flash("success", "Welcome to Wanderlust!");
return res.redirect("/listings");
        });
       
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}



module.exports.renderLoginForm = (req, res) => {
        res.render("users/login.ejs"); // Ensure the path matches your views directory
    }


    module.exports.login = async (req, res) => {
        req.flash("success", "Welcome to Wanderlust!");
        let redirectUrl = res.locals.redirect || "/listings";
        return res.redirect(redirectUrl); // Ensure only one response is sent
    }


    module.exports.loguot = async(req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "you are loged out!");
            return res.redirect("/listings");
        });
    };