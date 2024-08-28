<template>
  <div class="wrapper">
    <div class="badge bg-[#EDEDED]">
      <EmptyDocumentLogo
        style="height: 20px; width: 20px;"
      />
      <span>No data for this study</span>
    </div>
  </div>
</template>

<script setup>
	import EmptyDocumentLogo from '@images/icons/empty-document.svg';
</script>

<style scoped lang="scss">
.wrapper {
	display: inline-block;

	.badge {
		display: flex;
		gap: 4px;
		padding: 8px;
		border-radius: 8px;
	}
}
</style>
