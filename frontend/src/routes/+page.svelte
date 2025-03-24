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

<main class="p-4">
    <h2 class="text-xl font-bold mb-2">Fact Check Search</h2>
    <input
        type="text"
        bind:value={query}
        placeholder="Enter a claim to verify..."
        class="p-2 border rounded w-full"
    />
    <button on:click={fetchFactChecks} class="mt-2 p-2 bg-blue-500 text-white rounded" disabled={$loading}>
        {#if $loading} Checking... {/if} Search
    </button>

    <div class="mt-4">
        {#if $results.length > 0}
            {#each $results as claim}
                <div class="p-3 border-b">
                    <p class="font-bold">{claim.text}</p>
                    <p class="text-gray-500">Claimed by: {claim.claimant || "Unknown"}</p>
                    {#each claim.claimReview as review}
                        <div class="mt-2 p-2 border rounded">
                            <a href={review.url} target="_blank" class="text-blue-600">{review.title}</a>
                            <p>Published by: {review.publisher.name}</p>
                            <p>Rating: {review.textualRating}</p>
                        </div>
                    {/each}
                </div>
            {/each}
        {:else}
            <p>No results found.</p>
        {/if}
    </div>
</main>