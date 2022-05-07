<template>
	<nav class="fixed_menu_wrapper">
    <div class="fixed_menu">
      <router-link to="/room" class="fixed_menu_item talk">
        <img
        src="../assets/images/talk_icon.svg"
        alt="トークアイコン"
        class="fixed_menu_icon"
        />
        <p class="text-xs fixed_menu_annotation pl-5">ひぐまさんとのトークを<br>スタート</p>
      </router-link>
      <div class="fixed_menu_item clip">
        <img
          src="../assets/images/clip_icon.svg"
          alt="クリップアイコン"
          class="fixed_menu_icon"
        />
        <p class="text-xs fixed_menu_annotation pl-5">クリップした記事</p>
      </div>
    </div>
	</nav>
</template>