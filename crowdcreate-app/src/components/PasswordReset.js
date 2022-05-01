import { Link } from "react-router-dom"

function PasswordReset() {
    return (
        <div>
            <div>
                <div>
                    Password Reset
                </div>
                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form class="space-y-6" action="#" method="POST">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
                                <div class="mt-1">
                                    <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Password Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;