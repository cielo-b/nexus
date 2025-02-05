import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirect = ({ to }: { to: string }) => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to another page
        router.push(to); // Replace '/target-page' with your desired route
    }, [router]);

    return null; // Render nothing or show a loading spinner if necessary
};

export default Redirect;
