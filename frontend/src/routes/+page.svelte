<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import axios from "axios";

    let query = "";
    let results = writable([]);
    let loading = writable(false);

    async function fetchFactChecks() {
        if (!query.trim()) return;
        loading.set(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/fact-check?q=${query}`);
            results.set(response.data.claims || []);
        } catch (error) {
            console.error("Error fetching fact-check data:", error);
        }
        loading.set(false);
    }
</script>

<main class="p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-center p-6">
        <h1 class="logo"><b class="none">Legit Ba? Fact or Fake</b></h1>
    </div>
    <div class="max-w-3xl mx-auto bg-white rounded-lg p-10">
        <section class="intro p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Legit Ba? - Your Trusted Fact-Checking Source</h2>
            <p class="text-gray-600 mb-2">In a world filled with misinformation, it's harder than ever to separate fact from fiction...</p>
            <p class="text-gray-600 mb-2">Don't be fooled—stay informed. Before you believe, check with Legit Ba!</p>
        </section>
        
        <section class="fact_check p-6 mt-6">
            <h3 class="text-xl font-semibold text-gray-800">Fact Check Now</h3>
            <h4 class="text-gray-600 mb-4">Not sure if something is true? Enter a keyword, topic, or URL link below, and we'll verify it for you:</h4>
            <div class="mt-4">
                <input
                    type="text"
                    bind:value={query}
                    placeholder="Enter a keyword, topic, or URL link..."
                    class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                />
                <button on:click={fetchFactChecks} class="search mt-2 w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition" disabled={$loading}>
                    {#if $loading} Checking... {/if} Search
                </button>
            </div>
            <div class="mt-4">
                {#if $results.length > 0}
                    {#each $results as claim}
                        <div class="p-4 border-b bg-gray-50 rounded-lg mb-2">
                            <p class="font-bold text-gray-800">{claim.text}</p>
                            <p class="text-gray-500">Claimed by: {claim.claimant || "Unknown"}</p>
                            {#each claim.claimReview as review}
                                <div class="mt-2 p-3 border rounded bg-white shadow">
                                    <a href={review.url} target="_blank" class="text-blue-600 font-medium">{review.title}</a>
                                    <p class="text-sm text-gray-600">Published by: {review.publisher.name}</p>
                                    <p class="text-sm font-semibold">Rating: {review.textualRating}</p>
                                </div>
                            {/each}
                        </div>
                    {/each}
                {:else}
                    <p class="text-gray-600">No results found.</p>
                {/if}
            </div>
        </section>
    </div>
</main>
<footer class="p-6 bg-gray-100">
    <div class="footer-content">
        <h3>📝 Terms & Privacy Policy</h3>
        <p class="p-2">By using <strong>Legit Ba?</strong>, you agree to our terms and policies:</p>
        <p class="p-2"><strong>Accuracy & Responsibility:</strong> We strive to provide fact-checked, reliable information, but we do not guarantee absolute accuracy. Always verify with official sources. <strong>User Submissions:</strong> When submitting links or keywords for fact-checking, you acknowledge that the data may be reviewed and stored for analysis and service improvement. <strong>Privacy & Data Protection:</strong> We respect your privacy. Any personal data collected (such as search queries or submitted links) will not be shared with third parties without consent. <strong>Third-Party Links:</strong> Our website may include references or links to external sources. We are not responsible for their content or policies. <strong>Changes to Terms:</strong> We reserve the right to update our terms and policies at any time. Continued use of our service constitutes acceptance of any changes.</p>
        <p class="p-2">📩 <strong>Contact Us:</strong> If you have any concerns, feel free to reach out at <a href="mailto:support@legitba.com">support@legitba.com</a></p>
    </div>
</footer>

<style>
    :global {
        body {
            background-color: #ffffff;
            color: #414141;
            font-size: 16px;
            line-height: 1.6;
            letter-spacing: 0.1px;
            font-weight: 300;
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;
        }

        table {
            border: 1px solid #aaa;
            border-collapse: collapse;
        }

        caption {
            caption-side: bottom;
        }

        thead {
            border: 1px solid #aaa;
        }

        th {
            border: 1px solid #aaa;
        }
    }

    .logo {
        background-image: url("./images/legit_ba_logo.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 400px;
        height: 200px;
        margin: 0 auto;
    }

    .intro, .fact_check {
        margin: 0 auto;
        padding: 20px 10px;
        box-sizing: border-box;
    }

    .search {
        cursor: pointer;
    }

    .none {
        display: none;
    }

    footer {
        background: #f8f9fa;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #333;
    }
    .footer-content {
        max-width: 90%;
        margin: auto;
    }
    a {
        color: #007bff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>