const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center p-3">
            &copy; {new Date().getFullYear()} Clinic 360. All rights reserved.
        </footer>
    );
};

export default Footer;
